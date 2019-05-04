package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.DictionaryMeta;

public class UserDictMetaImpl {

    int num;
    Language from;
    Language to;

    public UserDictMetaImpl() {
    }

    public UserDictMetaImpl(int num, Language from, Language to) {
        this.num = num;
        this.from = from;
        this.to = to;
    }

    public UserDictMetaImpl(UserDictMeta meta) {
        this.num = meta.getNum();
        this.from = meta.getFrom();
        this.to = meta.getTo();
    }

    public UserDictMetaImpl(DictionaryMeta meta) {
        this.from = meta.getFrom();
        this.to = meta.getTo();
        this.num = 0;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public Language getFrom() {
        return from;
    }

    public void setFrom(Language from) {
        this.from = from;
    }

    public Language getTo() {
        return to;
    }

    public void setTo(Language to) {
        this.to = to;
    }
}
