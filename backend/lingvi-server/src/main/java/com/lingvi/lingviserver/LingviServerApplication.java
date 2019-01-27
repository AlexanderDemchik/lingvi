package com.lingvi.lingviserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LingviServerApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(LingviServerApplication.class, args);
    }

}

