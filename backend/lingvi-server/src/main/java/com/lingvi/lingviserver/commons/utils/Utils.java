package com.lingvi.lingviserver.commons.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class Utils {

    public static void setTimeout(Runnable runnable, int delay){
        new Thread(() -> {
            try {
                Thread.sleep(delay);
                runnable.run();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }).start();
    }

    public static void setTimeoutSync(Runnable runnable, int delay) {
        try {
            Thread.sleep(delay);
            runnable.run();
        }
        catch (Exception e){
            System.err.println(e);
        }
    }

    public static String detectFileExtension(String fileName) {
        if (fileName == null) return "";
        System.out.println(fileName);
        String[] splitted = fileName.split("\\.");
        if (splitted.length == 1) return "";
        System.out.println(splitted.length);
        return "." + splitted[splitted.length - 1];
    }

    /**
     * Helper method to get user id from spring context
     * @return user id
     */
    public static Long getUserId() {
        return Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}

