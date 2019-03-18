package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import org.springframework.data.domain.Slice;

import java.util.ArrayList;
import java.util.List;

public class UserWordSliceResponse {

    private List<UserWord> content = new ArrayList<>();
    private boolean last;
    private boolean first;
    private int page;

    public UserWordSliceResponse() {
    }

    public UserWordSliceResponse(Slice<UserWord> slice) {

        content = slice.getContent();
        last = slice.isLast();
        first = slice.isFirst();
        page = slice.getPageable().getPageNumber();
    }

    public List<UserWord> getContent() {
        return content;
    }

    public void setContent(List<UserWord> content) {
        this.content = content;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
