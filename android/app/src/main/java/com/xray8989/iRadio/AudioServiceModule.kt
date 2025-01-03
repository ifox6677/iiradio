package com.xray8989.iRadio

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class AudioServiceModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AudioService"
    }

    @ReactMethod
    fun startService(stationName: String) {
        val activity = currentActivity
        if (activity is MainActivity) {
            activity.startAudioService(stationName)
        } else {
            // 处理 activity 为 null 的情况
            // 例如，记录日志或抛出异常
            println("Error: Current activity is not MainActivity or is null")
        }
    }

    @ReactMethod
    fun stopService() {
        val activity = currentActivity
        if (activity is MainActivity) {
            activity.stopAudioService()
        } else {
            // 处理 activity 为 null 的情况
            println("Error: Current activity is not MainActivity or is null")
        }
    }
}