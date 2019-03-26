package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.commons.entities.Language;

public interface UserDictMeta {

    public Language getFrom();
    public Language getTo();
    public int getNum();
}
