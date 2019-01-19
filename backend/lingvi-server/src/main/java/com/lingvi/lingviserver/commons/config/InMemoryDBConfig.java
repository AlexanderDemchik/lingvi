package com.lingvi.lingviserver.commons.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "inMemoryEntityManagerFactory",
        transactionManagerRef = "inMemoryTransactionManager",
        basePackages = { "com.lingvi.lingviserver.**.repositories.inmemory" })
public class InMemoryDBConfig {

    @Autowired
    Environment environment;

    @Bean
    @ConfigurationProperties("spring.h2.datasource")
    public DataSourceProperties inMemoryDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("spring.h2.datasource")
    public HikariDataSource inMemoryDataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class)
                .build();
    }

    @Bean(name = "inMemoryEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean inMemoryEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("inMemoryDataSource") DataSource inMemoryDataSource) {

        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(inMemoryDataSource);
        em.setPackagesToScan(
                "com.lingvi.lingviserver.**.entities.inmemory");
        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto",
                environment.getProperty("spring.h2.jpa.hibernate.ddl-auto"));
        properties.put("hibernate.show_sql",
                environment.getProperty("spring.h2.jpa.hibernate.show_sql"));
        em.setJpaPropertyMap(properties);

        return em;

//        return builder
//                .dataSource(inMemoryDataSource)
//                .packages("com.lingvi.lingviserver.**.entities.inmemory")
//                .persistenceUnit("inMemory")
//                .build();
    }

    @Bean(name = "inMemoryTransactionManager")
    public PlatformTransactionManager inMemoryTransactionManager(
            @Qualifier("inMemoryEntityManagerFactory") EntityManagerFactory inMemoryEntityManagerFactory) {
        return new JpaTransactionManager(inMemoryEntityManagerFactory);
    }

}