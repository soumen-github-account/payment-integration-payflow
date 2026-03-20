package in.payflow.payflowAPI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PayflowApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PayflowApiApplication.class, args);
	}
	
	@Bean
	CommandLineRunner test(@Value("${spring.data.mongodb.uri:NOT_FOUND}") String uri) {
	    return args -> {
	        System.out.println("🔥 URI = " + uri);
	    };
	}

}
