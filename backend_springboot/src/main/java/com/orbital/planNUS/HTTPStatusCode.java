package com.orbital.planNUS;

public enum HTTPStatusCode {
    OK(200),
    BadRequest(400),
    Unauthorized(401),
    NotFound(404);

    private int code;

    public int getCode() {
        return this.code;
    }

    private HTTPStatusCode(int code) {
        this.code = code;
    }
}
