package com.lingvi.lingviserver.security.entities.primary;

/**
 * User role model
 */
//@Entity(name = "roles")
//public class Role {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(unique = true)
//    private String role;
//
//    public Role() {
//    }
//
//    public Role(String role) {
//        this.role = role;
//    }
//
//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//}

public enum Role {
    ADMIN, USER, MODERATOR
}
