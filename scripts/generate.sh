# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken

# -x option instructs bash to print before executes each command
set -ex

# Append command folders to the PATH to ensure that all builtin-deps commands are available.
export PATH+=':/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'



# if env var not set or empty.
: "${DIALOG_OK:=0}"
: "${DIALOG_CANCEL:=1}"
: "${DIALOG_ESC:=255}"



build() {
  apt-get -y update --fix-missing
  apt-get -y install lua5.1 liblua5.1-0.dev
  curl https://raw.githubusercontent.com/xiyuan404/wiki/v1-vitepress/scripts/linux-install0luarocks.sh -sL | bash -
  luarock install doc

  rm -rf docs/output || true
  mkdir docs/output || true

  cd docs/output
  find ../docs/core -name "*.lua" -type f -c ../config.ld {} \;

  rm ../md_files_name.txt || true
  output="./"
  mds=$(ls $output)
  for md in $mds
  do 
    echo $md >> ../md_files_name.txt
  done
}


case_opt=$1
case $case_opt in 
  (build)
    build
    ;;
esac
