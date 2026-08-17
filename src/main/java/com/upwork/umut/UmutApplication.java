package com.upwork.umut;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class UmutApplication {
    private static final Logger log = LoggerFactory.getLogger(UmutApplication.class);

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(UmutApplication.class, args);
        if (log.isInfoEnabled()) {
            log.info(ApplicationStartupTraces.of(ctx));
        }
    }

    @Bean
    public OpenAPI umutOpenAPI() {
        return new OpenAPI().info(swaggerInfo()).externalDocs(swaggerExternalDoc());
    }

    private Info swaggerInfo() {
        return new Info()
                .title("Umut API")
                .description("Umut portfolio backend API")
                .version("1.0")
                .license(new License().name("No license").url(""));
    }

    private ExternalDocumentation swaggerExternalDoc() {
        return new ExternalDocumentation().description("Project Documentation").url("");
    }
}
