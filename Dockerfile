# Start from a base Go image
FROM golang:1.18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download and install the Go dependencies
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go application
RUN go build -o main .

# Expose the port that the application will listen on
EXPOSE 8080

# Set the command to run the executable when the container starts
CMD ["./main"]