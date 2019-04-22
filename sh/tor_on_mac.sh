#!/usr/bin/env bash
# Prease see https://www.torproject.org/docs/tor-doc-osx.html.en

# 'Wi-Fi' or 'Ethernet' or 'Display Ethernet'
INTERFACE=Wi-Fi

# Ask for the administrator password upfront
sudo -v

# Keep-alive: update existing `sudo` time stamp until finished
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# trap ctrl-c and call disable_proxy()
function disable_proxy() {
    sudo networksetup -setsocksfirewallproxystate $INTERFACE off
    echo "$(tput setaf 64)" #green
    echo "SOCKS proxy disabled."
    echo "$(tput sgr0)" # color reset
}
trap disable_proxy INT

# Rollback
sudo networksetup -setsocksfirewallproxy $INTERFACE 127.0.0.1 9050 off
sudo networksetup -setsocksfirewallproxystate $INTERFACE on

echo "$(tput setaf 64)" # green
echo "SOCKS proxy 127.0.0.1:9050 enabled."
echo "$(tput setaf 136)" # orange
echo "Starting Tor..."
echo "$(tput sgr0)" # color reset

# Start Tor
tor
