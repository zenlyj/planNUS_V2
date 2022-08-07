package com.orbital.planNUS;

public class UserResponse {
    private int status;
    private String message;
    private String data;

    public UserResponse() {}


    public int getStatus() {
        return status;
    }

    public void setStatus(HTTPStatusCode status) {
        this.status = status.getCode();
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
