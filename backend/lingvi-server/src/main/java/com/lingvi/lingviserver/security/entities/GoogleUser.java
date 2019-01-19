package com.lingvi.lingviserver.security.entities;

import com.fasterxml.jackson.annotation.JsonSetter;

/**
 * @see ProviderUser
 */
public class GoogleUser extends ProviderUser {

    @Override
    @JsonSetter("family_name")
    public void setFamilyName(String familyName) {
        super.setFamilyName(familyName);
    }

    @Override
    @JsonSetter("picture")
    public void setProfilePhoto(String profilePhoto) {
        super.setProfilePhoto(profilePhoto);
    }

    @Override
    @JsonSetter("id")
    public void setId(String id) {
        super.setId(id);
    }

    @Override
    @JsonSetter("given_name")
    public void setGivenName(String name) {
        super.setGivenName(name);
    }
}
