package com.lingvi.lingviserver.commons.utils;

import com.lingvi.lingviserver.commons.entities.Language;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

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

    public static String getRootUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
    }

    public static String getExtension(String fileName) {
        String extension = "";
        int i = fileName.lastIndexOf('.');
        if (i > 0) {
            extension = fileName.substring(i+1);
        }
        return extension;
    }

    public static Language getLanguage() {
        Locale locale = LocaleContextHolder.getLocale();
        Language language;
        try {
            language = Language.fromValue(locale.getLanguage());
        } catch (IllegalArgumentException e) {
            language = Language.EN;
        }
        return language;
    }
}

