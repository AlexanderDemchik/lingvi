package com.lingvi.lingviserver.video.entities.handler;

public abstract class Stage {
    private boolean status = false;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
