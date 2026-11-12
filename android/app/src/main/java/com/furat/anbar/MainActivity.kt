
package com.furat.anbar

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import org.maplibre.android.MapLibre
import org.maplibre.android.maps.MapView
import org.maplibre.android.maps.MapLibreMap
import org.maplibre.android.camera.CameraPosition
import org.maplibre.android.geometry.LatLng

class MainActivity : Activity() {

    private lateinit var mapView: MapView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.statusBarColor = Color.rgb(10, 10, 14)
        window.navigationBarColor = Color.rgb(10, 10, 14)

        MapLibre.getInstance(this)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(Color.rgb(10, 10, 14))
        }

        val header = TextView(this).apply {
            text = "فُرات  |  FURAT"
            textSize = 25f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER_VERTICAL
            setPadding(24, 22, 24, 22)
            setBackgroundColor(Color.rgb(17, 14, 27))
        }

        val subtitle = TextView(this).apply {
            text = "ANBAR'S SMART MAP"
            textSize = 11f
            setTextColor(Color.rgb(190, 160, 255))
            gravity = Gravity.CENTER
            setPadding(8, 12, 8, 12)
        }

        mapView = MapView(this)
        mapView.onCreate(savedInstanceState)

        root.addView(header)
        root.addView(subtitle)
        root.addView(
            mapView,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                0,
                1f
            )
        )

        val footer = TextView(this).apply {
            text = "الأنبار • العراق"
            textSize = 14f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setPadding(12, 18, 12, 18)
            setBackgroundColor(Color.rgb(17, 14, 27))
        }

        root.addView(footer)
        setContentView(root)

        mapView.getMapAsync { map ->
            map.setCameraPosition(
                CameraPosition.Builder()
                    .target(LatLng(33.42, 43.30))
                    .zoom(8.0)
                    .build()
            )

            map.setStyle("https://demotiles.maplibre.org/style.json")
        }
    }

    override fun onStart() {
        super.onStart()
        mapView.onStart()
    }

    override fun onResume() {
        super.onResume()
        mapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        mapView.onPause()
    }

    override fun onStop() {
        super.onStop()
        mapView.onStop()
    }

    override fun onDestroy() {
        mapView.onDestroy()
        super.onDestroy()
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView.onLowMemory()
    }
}
