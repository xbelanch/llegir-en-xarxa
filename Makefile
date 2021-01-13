rootdir = $(realpath .)

.PHONY: all
all: http-server

.PHONY: http-server
http-server:
	@cd $(rootdir)/Lostphone/; http-server.cmd -c-1 -p 8080
