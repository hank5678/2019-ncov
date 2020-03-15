import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react"
import loadGoogleMapsApi from "load-google-maps-api"
import * as topojson from "topojson-client"
// import { useMouse, useWindowSize } from "react-use"

import ReactGA from "react-ga"
import moment from "moment"

import { MapContainer } from "./styled"

import AreaStatisticsLightBox from "../AreaStatisticsLightBox/"
import MapInfoBox from "../MapInfoBox"
import { getAreaEpidemicAsync } from "api"

import { setLoading } from "redux/action/loading"
import { useDispatch, useSelector } from "react-redux"

import mapStyle from "config/mapStyle"
import isoMap from "config/countries-iso-map.json"
import world from "config/topojson/world-countries.json"
import china from "config/topojson/china-provinces.json"
import hongkongmacau from "config/topojson/hongkong-macau.json"
import malaysia from "config/topojson/malaysia.json"
import singapore from "config/topojson/singapore.json"

const getCountryName = ISO3 => {
  const isoTarget = isoMap.find(el => {
    return el.ISO3 === ISO3
  })
  const name = isoTarget ? isoTarget.Taiwan : "未知"
  return name
}

const getCountryKey = ISO3 => {
  const isoTarget = isoMap.find(el => {
    return el.ISO3 === ISO3
  })
  const key = isoTarget ? isoTarget.China : ""
  return key
}

const getFillOpacity = (value, average, max) => {
  if (value > 0) {
    if (value === max) {
      return 1
    } else {
      if (value > average) {
        return 0.8
      } else {
        if (value > average / 2) {
          return 0.6
        } else {
          return 0.4
        }
      }
    }
  } else {
    return 0
  }
}

export default memo(function EpidemicMap() {
  const dispatch = useDispatch()
  const epidemic = useSelector(state => state.epidemic)
  const map = useRef()
  const mapContainerRef = useRef(null)
  const [focusArea, setFocusArea] = useState({})
  const [areaDailyEpidemic, setAreaDailyEpidemic] = useState([])
  const [statisticsVisible, setStatisticsVisible] = useState(false)
  const [statisticsAreaName, setStatisticsAreaName] = useState("")

  const getEpidEmicData = useCallback(
    key => {
      const target = epidemic.find(el => el.key === key)
      if (target) {
        return target
      } else {
        return {}
      }
    },
    [epidemic]
  )

  const getProvinceName = useCallback(
    key => {
      const target = epidemic.find(el => el.key === key)
      if (target) {
        return target.apiKey
      } else {
        return ""
      }
    },
    [epidemic]
  )

  const confirmedCountMax = useMemo(() => {
    if (epidemic.length > 0) {
      return Math.max(
        ...epidemic.map(el => {
          return el.confirmedCount
        })
      )
    } else {
      return 0
    }
  }, [epidemic])

  const confirmedCountAverage = useMemo(() => {
    if (epidemic.length > 0) {
      return epidemic.reduce((acc, cur) => acc + cur.confirmedCount, 0) / epidemic.length
    } else {
      return 0
    }
  }, [epidemic])

  useEffect(() => {
    if (epidemic.length > 0 && confirmedCountAverage > 0) {
      loadGoogleMapsApi({
        key: "AIzaSyBivw2CaMciF5qJtAE5J8pLvqMC6_YqKPo"
      })
        .then(function(googleMaps) {
          map.current = new googleMaps.Map(mapContainerRef.current, {
            center: {
              lat: 31,
              lng: 118
            },
            styles: mapStyle,
            zoom: 5,
            maxZoom: 9,
            minZoom: 3,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          })

          const worldGeoJson = topojson.feature(world, world.objects.countries1)
          worldGeoJson.features = worldGeoJson.features
            .filter(el => el.id !== "CHN" && el.id !== "ATA" && el.id !== "MYS")
            .map(el => ({ ...el, properties: { ISO: el.id, name: getCountryName(el.id), key: getCountryKey(el.id) } }))

          const chinaGeoJson = topojson.feature(china, china.objects.CHN_adm1)
          chinaGeoJson.features = chinaGeoJson.features.map(el => {
            const key = el.properties.NL_NAME_1.split("|")[1] ? el.properties.NL_NAME_1.split("|")[1] : el.properties.NL_NAME_1.split("|")[0]
            return { ...el, properties: { ISO: el.properties.ISO, name: el.properties.NL_NAME_1.split("|")[0], key } }
          })

          const hongkongMacauGeoJson = topojson.feature(hongkongmacau, hongkongmacau.objects.layer1)
          hongkongMacauGeoJson.features = hongkongMacauGeoJson.features.map(el => {
            switch (el.properties.ISO_A2) {
              case "HK":
                return { ...el, properties: { ISO: "CHN", name: "香港", key: "香港" } }
              case "MO":
                return { ...el, properties: { ISO: "CHN", name: "澳門", key: "澳门" } }
              default:
                return { ...el }
            }
          })

          const malaysiaGeoJson = topojson.feature(malaysia, malaysia.objects.MYS)
          malaysiaGeoJson.features = malaysiaGeoJson.features.map(el => ({
            ...el,
            properties: { ISO: el.properties.ISO3166_1_, name: "馬來西亞", key: "马来西亚" }
          }))

          const singaporeGeoJson = topojson.feature(singapore, singapore.objects.SGP)
          singaporeGeoJson.features = singaporeGeoJson.features.map(el => ({
            ...el,
            properties: { ISO: el.properties.ISO3166_1_, name: "新加坡", key: "新加坡" }
          }))

          map.current.data.addGeoJson(singaporeGeoJson)
          map.current.data.addGeoJson(malaysiaGeoJson)
          map.current.data.addGeoJson(hongkongMacauGeoJson)
          map.current.data.addGeoJson(worldGeoJson)
          map.current.data.addGeoJson(chinaGeoJson)
          map.current.data.setStyle(feature => {
            // console.log(epidemic)
            // console.log(feature)
            const target = epidemic.find(el => el.key === feature.j.key)
            const confirmedCount = target ? target.confirmedCount : 0
            const fillOpacity = getFillOpacity(confirmedCount, confirmedCountAverage, confirmedCountMax)
            return {
              fillColor: "#17F81A",
              fillOpacity,
              strokeColor: "#000000",
              strokeOpacity: 1,
              strokeWeight: 0.5,
              clickable: true,
              draggable: false,
              editable: false,
              geodesic: false,
              zIndex: 1
            }
          })

          map.current.data.addListener("click", event => {
            if (window.innerWidth > 768) {
              if (getEpidEmicData(event.feature.j.key).confirmedCount > 0) {
                dispatch(setLoading(true))
                getAreaEpidemicAsync({ province: getProvinceName(event.feature.j.key) })
                  .then(res => {
                    if (res.data.success) {
                      setAreaDailyEpidemic(
                        res.data.results
                          .reduce((acc, cur) => {
                            if (acc.some(el => moment(el.updateTime).format("YYYYMMDD") === moment(cur.updateTime).format("YYYYMMDD"))) {
                              return acc.map(el => {
                                if (moment(el.updateTime).format("YYYYMMDD") === moment(cur.updateTime).format("YYYYMMDD")) {
                                  return cur
                                } else {
                                  return el
                                }
                              })
                            } else {
                              return [...acc, cur]
                            }
                          }, [])
                          .sort((a, b) => a.updateTime - b.updateTime)
                      )
                      setStatisticsVisible(true)
                      setStatisticsAreaName(event.feature.j.name)
                      ReactGA.pageview("areaStatistics")
                    }
                  })
                  .finally(() => {
                    dispatch(setLoading(false))
                  })
              }
            }
          })

          map.current.data.addListener("mousedown", event => {
            if (window.innerWidth <= 768) {
              const data = getEpidEmicData(event.feature.j.key)
              setFocusArea({ ...event.feature.j, data })
            }
          })

          map.current.data.addListener("mouseover", event => {
            if (window.innerWidth > 768) {
              const data = getEpidEmicData(event.feature.j.key)
              if (data.confirmedCount > 0) {
                setFocusArea({ ...event.feature.j, data })
              }
            }
          })
          map.current.data.addListener("mouseout", event => {
            if (window.innerWidth > 768) {
              setFocusArea({})
            }
          })
          map.current.addListener("drag", event => {
            if (window.innerWidth <= 768) {
              setFocusArea({})
            }
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [epidemic, confirmedCountAverage, confirmedCountMax, getEpidEmicData, getProvinceName, dispatch])

  const clearFocusArea = useCallback(() => {
    setFocusArea({})
  }, [])

  const closeStatistics = useCallback(() => {
    setStatisticsVisible(false)
    ReactGA.pageview("map")
  }, [])

  return (
    <div>
      <MapContainer ref={mapContainerRef} />
      <MapInfoBox mapContainerRef={mapContainerRef} focusArea={focusArea} clearFocusArea={clearFocusArea} />
      <AreaStatisticsLightBox visible={statisticsVisible} close={closeStatistics} dailyEpidemic={areaDailyEpidemic} areaName={statisticsAreaName} />
    </div>
  )
})
