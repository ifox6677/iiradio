package com.xray8989.iRadio

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

class AudioForegroundService : Service() {

    private val CHANNEL_ID = "AudioForegroundServiceChannel"

    companion object {
        private const val NOTIFICATION_ID = 1
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        createNotificationChannel()

        // 从 intent 中获取电台名称
        val stationName = intent?.getStringExtra("stationName") ?: "未知电台"

        // 创建点击通知时跳转的 Intent
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this,
            0, notificationIntent, PendingIntent.FLAG_IMMUTABLE
        )

        // 构建通知
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("正在播放：")
            .setContentText(stationName) // 动态显示电台名称
            .setSmallIcon(R.drawable.ic_notification)
            .setContentIntent(pendingIntent)
            .setSound(null) // 禁用声音
            .build()

        // 启动前台服务
        startForeground(NOTIFICATION_ID, notification)

        // 返回 START_STICKY，表示服务在被杀死后会重新创建
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "音频播放服务",
                NotificationManager.IMPORTANCE_LOW // 设置为低重要性，避免声音
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }
}