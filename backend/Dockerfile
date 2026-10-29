# Stage 1: Build Spring Boot JAR with Maven & Java 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Production JRE runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Render injects $PORT dynamically; default to 8082 if not provided
ENV PORT=8082
EXPOSE 8082

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
