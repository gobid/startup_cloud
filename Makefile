CC=g++
CFLAGS=-c -Wall
LDFLAGS=-lcurl
SOURCES=update_ticker_list.cpp
OBJECTS=$(SOURCES:.cpp=.o)
EXECUTABLE=update_ticker_list

all: $(SOURCES) $(EXECUTABLE)
	
$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@

clean: 
	rm -rf *.o a.out