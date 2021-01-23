#!/bin/sh

# ----------------------------------------
# Functions
# ----------------------------------------

# $1=string
# $2=delimiter

# @returns Array
# function splitString {
#   local comboString=$1$2
#   local arr=();

#   while [[ $comboString ]]; do
#     arr+=( "${comboString%%"$2"*}" );
#     comboString=${comboString#*"$2"};
#   done;

#   declare -p arr
#   return $arr
# }

# ----------------------------------------
# Procedure
# ----------------------------------------
cd "$(dirname "$0")"
chapters="[\\r\\n"

files=`ls *.mp3`
loopIndex=1
declare -i loopIndex

for entry in $files
do
  # echo "current chapter: $loopIndex"

  # Result: Chapter-14_Norbert,-The-Norwegian-Ridgeback.mp3
  uri="$entry"

  chapterDelimiter=_
  comboString=$entry$chapterDelimiter
  chapterArr=();

  while [[ $comboString ]]; do
    chapterArr+=( "${comboString%%"$chapterDelimiter"*}" );
    comboString=${comboString#*"$chapterDelimiter"};
  done;
  # splitString $entry '_'
  # declare -p chapterArr
  # Result: chapterArr='([0]="Chapter-14" [1]="Norbert,-The-Norwegian-Ridgeback.mp3")'

  # Isolate chapter raw title
  titleStringWithMP3=${chapterArr[1]}
  # Result: "Norbert,-The-Norwegian-Ridgeback.mp3"

  # Strip trailing ".mp3"
  titleStringWithMP3Length=${#titleStringWithMP3}
  declare -i titleStringWithMP3Length
  titleStringWithMP3Length=$((titleStringWithMP3Length - 4))
  titleStringRaw=${titleStringWithMP3:0:$titleStringWithMP3Length}
  # Result: "Norbert,-The-Norwegian-Ridgeback"

  # Get Title
  titleDelimiter="-"
  titleComboString=$titleStringRaw$titleDelimiter
  titleStringArr=();

  while [[ $titleComboString ]]; do
    titleStringArr+=( "${titleComboString%%"$titleDelimiter"*}" );
    titleComboString=${titleComboString#*"$titleDelimiter"};
  done;
  # declare -p titleStringArr
  # Result: titleStringArr='([0]="Norbert," [1]="The" [2]="Norwegian" [3]="Ridgeback")'

  # Format title with spaces
  formattedTitle=""
  titleWordIndex=0
  declare -i titleWordIndex

  for word in ${titleStringArr[@]}
  do
    if [ $titleWordIndex -gt 0 ];
    then
      formattedTitle+=" $word"
    else
      formattedTitle+="$word"
    fi

    titleWordIndex+=1
  done
  # echo "$formattedTitle"

  # Format JSON and append to output
  formatJSON="{ \"index\" : $loopIndex, \"title\" : \"$formattedTitle\", \"uri\" : \"$uri\" }"
  # echo "$formatJSON"

  chapters+="$formatJSON,\\r\\n"

  loopIndex+=1
  # echo ""
done

chapters+=]
echo $chapters > out.txt
