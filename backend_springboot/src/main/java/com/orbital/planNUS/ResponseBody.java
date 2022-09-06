package com.orbital.planNUS;

import org.springframework.http.HttpStatus;

public class ResponseBody {
    private int status;
    private String message;
    private String data;

    public ResponseBody() {}

    public int getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status.value();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
