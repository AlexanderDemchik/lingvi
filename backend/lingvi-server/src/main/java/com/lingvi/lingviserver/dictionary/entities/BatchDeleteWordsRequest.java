package com.lingvi.lingviserver.dictionary.entities;

import java.util.List;

public class BatchDeleteWordsRequest {
    private List<Long> ids;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
}
