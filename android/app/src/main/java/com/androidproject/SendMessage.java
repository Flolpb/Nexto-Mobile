package com.androidproject;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class SendMessage extends HeadlessJsTaskService {

    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        return new HeadlessJsTaskConfig(
                "SendMessage",
                null,
                5000, // timeout for the task
                false // optional: defines whether or not  the task is allowed in foreground. Default is false
        );
    }
}
