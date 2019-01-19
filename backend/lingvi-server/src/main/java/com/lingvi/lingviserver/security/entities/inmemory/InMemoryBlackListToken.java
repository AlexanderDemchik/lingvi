package com.lingvi.lingviserver.security.entities.inmemory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity(name = "black_list")
public class InMemoryBlackListToken {

    @Id
    private String token;

    @Column
    private Date addingDate;
}
