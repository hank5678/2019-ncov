import React, { useState, useEffect, useMemo, useCallback } from "react"

import axios from "axios"
import { Line } from "react-chartjs-2"
import moment from "moment"
import MarqueeText from "react-marquee-text-component"
import { useWindowSize } from "react-use"
import ReactGA from "react-ga"

import { setLoading } from "redux/action/loading"
import { setEpidmic } from "redux/action/epidemic"
import { setOverall } from "redux/action/overall"
import { useDispatch, useSelector } from "react-redux"

import EpidemicMap from "../EpidemicMap"
import Loading from "../Loading/"
import AreaListPanel from "../AreaListPanel/"
import MobilePanel from "../MobilePanel/"
import LastUpdateLightBox from "../LastUpdateLightBox/"
import OverallLightBox from "../OverallLightBox/"
import getFormattedTime from "util/getFormattedTime"
import { getEpidemicAsync, getOverallData } from "api"
import {
  Title,
  InfoBox,
  InfoTitle,
  InfoLastUpdateText,
  InfoText,
  Button,
  ChartPanel,
  MarqueeContainer,
  Overlay,
  BoxShadow,
  Copyright,
  Link,
  ApiErrorMessage,
  ApiErrorMessageText
} from "./styled"

import { datasetStyle1, datasetStyle2 } from "config/chartDatasetStyle"

const chartPanelOptions = {
  legend: {
    labels: {
      fontColor: "rgba(23, 248, 26, 1)"
    }
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: "#0C5116"
        },
        ticks: {
          fontColor: "rgba(23, 248, 26, 1)"
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          color: "#0C5116"
        },
        ticks: {
          fontColor: "rgba(23, 248, 26, 1)"
        }
      }
    ]
  }
}

export default function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  const overall = useSelector(state => state.overall)
  const [overallVisible, setOverallVisible] = useState(false)
  const [lastUpdateLightBoxVisible, setLastUpdateLightBoxVisible] = useState(false)
  const [apiError, setApiError] = useState(false)
  const { width } = useWindowSize()

  const lastUpdateInfo = useMemo(() => {
    if (overall.length > 0) {
      const time = getFormattedTime(Math.max(...overall.map(el => el.updateTime)))
      const data = overall[overall.length - 1]
      const { confirmedCount, suspectedCount, curedCount, deadCount } = data
      return { time, confirmedCount, suspectedCount, curedCount, deadCount }
    } else {
      return { time: "", confirmedCount: 0, suspectedCount: 0, curedCount: 0, deadCount: 0 }
    }
  }, [overall])

  const panelChartData = useMemo(() => {
    return {
      labels: overall.map(el => moment(el.updateTime).format("M/D")),
      datasets: [
        {
          label: "確診",
          data: overall.map(el => el.confirmedCount),
          ...datasetStyle1
        },
        {
          label: "疑似",
          data: overall.map(el => el.suspectedCount),
          ...datasetStyle2
        }
      ]
    }
  }, [overall])

  useEffect(() => {
    dispatch(setLoading(true))
    axios
      .all([getEpidemicAsync(), getOverallData()])
      .then(
        axios.spread((epidemicResponse, overallResponse) => {
          if (epidemicResponse.status === 200 && epidemicResponse.data.success && overallResponse.status === 200 && overallResponse.data.success) {
            dispatch(setOverall(overallResponse.data.results))
            dispatch(setEpidmic(epidemicResponse.data.results))
          } else {
            setApiError(true)
          }
        })
      )
      .finally(() => {
        dispatch(setLoading(false))
      })
      .catch(() => {
        setApiError(true)
      })
  }, [dispatch])

  const showOverall = useCallback(() => {
    setOverallVisible(true)
    ReactGA.pageview("overallStatistics")
  }, [])

  const hideOverall = useCallback(() => {
    setOverallVisible(false)
    ReactGA.pageview("map")
  }, [])

  const showLastUpdateLightBox = useCallback(() => {
    setLastUpdateLightBoxVisible(true)
    ReactGA.pageview("lastUpdate")
  }, [])

  const hideLastUpdateLightBox = useCallback(() => {
    setLastUpdateLightBoxVisible(false)
    ReactGA.pageview("map")
  }, [])

  return (
    <div>
      <Title>2019新型冠狀病毒(2019-nCoV)疫情地圖</Title>
      <EpidemicMap />
      {lastUpdateInfo.time !== "" && width > 768 && (
        <InfoBox>
          <InfoTitle>最新疫情統計</InfoTitle>
          <InfoLastUpdateText>({lastUpdateInfo.time})</InfoLastUpdateText>
          <InfoText>確診：{lastUpdateInfo.confirmedCount}</InfoText>
          <InfoText>疑似：{lastUpdateInfo.suspectedCount}</InfoText>
          <InfoText>治癒：{lastUpdateInfo.curedCount}</InfoText>
          <InfoText>死亡：{lastUpdateInfo.deadCount}</InfoText>
          <Button onClick={showOverall}>數據圖表</Button>
        </InfoBox>
      )}
      {overall.length > 0 && width > 768 && (
        <ChartPanel>
          <InfoTitle>疫情累計趨勢圖</InfoTitle>
          <Line data={panelChartData} height={186} options={chartPanelOptions} />
        </ChartPanel>
      )}

      <OverallLightBox visible={overallVisible} close={hideOverall} />

      {width > 768 && (
        <MarqueeContainer>
          <MarqueeText
            duration={120}
            text="衛生福利部中華民國 109 年 1 月 15 日衛授疾字第 1090100030 號公告，新增「嚴重特殊傳染性肺炎」為第五類法定傳染病。2019年12月以來，湖北省武漢市展開呼吸道疾病及相關疾病監測，發現不明原因病毒性肺炎病例。個案臨床表現主要為發熱，少數病人呼吸困難，胸部X光片呈雙肺浸潤性病灶。2020年1月9日接獲中國大陸通知，病原體初步判定為新型冠狀病毒，已完成病毒全長基因定序，電子顯微鏡下亦呈典型冠狀病毒型態，該病毒不同於以往發現的人類冠狀病毒。冠狀病毒(CoV)為一群有外套膜之RNA病毒，外表為圓形，在電子顯微鏡下可看到類似皇冠的突起因此得名。除已知會感染人類的七種冠狀病毒以外，其他的動物宿主包括蝙蝠、豬、牛、火雞、貓、狗、雪貂等。並有零星的跨物種傳播報告。"
          />
        </MarqueeContainer>
      )}
      <AreaListPanel />
      {width <= 768 && (
        <>
          <MobilePanel showOverall={showOverall} showLastUpdateLightBox={showLastUpdateLightBox} />
          <LastUpdateLightBox visible={lastUpdateLightBoxVisible} close={hideLastUpdateLightBox} lastUpdateInfo={lastUpdateInfo} />
        </>
      )}
      <Overlay />
      <BoxShadow />
      <Copyright>
        <p>
          本專案無商業盈利，為學習與研究目的而設計製作，有任何問題請聯繫
          <Link href="https://www.facebook.com/profile.php?id=1671407020" target="_blank" rel="noopener noreferrer">
            我
          </Link>
          ，感謝
          <Link href="https://github.com/BlankerL/DXY-2019-nCoV-Crawler" target="_blank" rel="noopener noreferrer">
            疫情數據
          </Link>
          提供。
        </p>
      </Copyright>
      <Loading visible={loading} />
      {apiError && (
        <ApiErrorMessage>
          <ApiErrorMessageText>目前暫時無法獲取數據，請稍後再試</ApiErrorMessageText>
        </ApiErrorMessage>
      )}
    </div>
  )
}
