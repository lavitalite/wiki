#!/bin/bash

set -ex

#权限检查与提权
[[ $UID != 0]] && exec sudo -E "$(readlink -f "$0")" "$@"

up() {
  killall wpa_supplicant dhcpcd || true
  # 为接口分配地址
  ip addr add 192.168.4.33/32 dev wgvpn0
}

command="$1"
shift

case "$command" in
  up) up "$@" ;;
  down) down "$@" ;;
  exec) execi "$@" ;;
  *) echo "Usuage: $0 up|down|exec " >&2; exit 1;;
esac