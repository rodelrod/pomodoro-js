#!/usr/bin/env bash

if [[ `find app -mmin -1` ]] 
then
    webpack -d
fi
