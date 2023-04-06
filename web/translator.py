import sys
from libretranslatepy import LibreTranslateAPI

lt = LibreTranslateAPI("https://translate.argosopentech.com/")

print(lt.translate(f"{sys.argv[1]}", "ja", "en"))