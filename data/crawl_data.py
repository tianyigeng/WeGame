# Name, Platform, Year, Genre, Publisher
# div id : "mv-content-text"
# table class: infobox hproduct
# tbody
# tr
# th title = "Video game publisher
# title Nitendo

import os
import csv
import urllib2
from urllib2 import urlopen
from bs4 import BeautifulSoup

def crawlGameInfo():
    current_path = os.getcwd()
    unmatch_games = current_path + '/unmatched_games.txt'
    csv_f = open(current_path + '/raw_data/crawl_games.csv', 'w')
    writer = csv.writer(csv_f)
    writer.writerow(["Name", "Platform", "Year", "Genre", "Publisher"])
    # List of Linux games
    names, diction = searchOnList()
    names2, diction2 = searchOnList2()
    for n in names:
        newRow = []
        newRow.append(n)
        newRow += diction[n]
        writer.writerow(newRow)

    for n2 in names2:
        if n2 in names:
            continue
        newRow = []
        newRow.append(n2)
        newRow += diction2[n2]
        writer.writerow(newRow)

    with open(unmatch_games) as f:
        for line in f:
            newRow = []
            newRow.append(line[:-1])

            if line[:-1] in names or line[:-1] in names2:
                continue

            else:
                searchLine = '_'.join(line[:-1].split(" "))
                url = "https://en.wikipedia.org/wiki/"+searchLine
                newRow += searchOnWiki(url)

                if len(newRow) <= 2:
                    continue

                else:
                    writer.writerow(newRow)

    csv_f.close()

def searchOnList():
    listPage = urllib2.urlopen("https://en.wikipedia.org/wiki/List_of_Linux_games")
    gameList = BeautifulSoup(listPage, "lxml")
    names = []
    dictionary = {}

    div = gameList.find('div', {"class" : "mw-parser-output"})
    for table in div.findAll('table')[2:]:
        for tr in table.findAll('tr'):
            infolist = tr.findAll('td')
            if len(infolist) < 6:
                continue
            names.append(infolist[0].text.encode('utf-8'))

            info = []
            # Platform

            info.append(infolist[4].text.encode('utf-8'))
            # Year
            info.append(infolist[5].text[-4:])
            # Genre
            if len(infolist[3].findAll('a')) != 0:
                info.append(infolist[3].findAll('a')[0].text.encode('utf-8'))
            elif "," in infolist[3].text:
                info.append(infolist[3].text.split(',')[0].encode('utf-8'))
            else:
                info.append(infolist[3].text.encode('utf-8'))
            # Publisher
            info.append(infolist[2].text.encode('utf-8'))

            dictionary[infolist[0].text.encode('utf-8')] = info

    return names, dictionary

def searchOnList2():
    listPage = urllib2.urlopen("https://en.wikipedia.org/wiki/List_of_Game_of_the_Year_awards")
    gameList = BeautifulSoup(listPage, "lxml")
    names = []
    dictionary = {}

    div = gameList.find('div', {"class" : "mw-parser-output"})
    for table in div.findAll('table'):
        for tr in table.findAll('tr')[1:]:
            infolist = tr.findAll('td')
            if len(infolist) < 5:
                continue

            name = infolist[1].text.encode('utf-8')

            if "[" in name:
                parse = infolist[1].text.encode('utf-8').index('[')
                name = name[:parse]
                names.append(name)

            else:
                names.append(name)

            info = []
            # Platform
            info.append(infolist[3].text.encode('utf-8'))
            # Year
            info.append(infolist[0].text)
            # Genre
            info.append(infolist[2].text.encode('utf-8'))
            # Publisher
            info.append(infolist[4].text.encode('utf-8'))

            dictionary[name] = info

    return names, dictionary

def searchOnWiki(url):
    try:
        webPage = urllib2.urlopen(url)
        gamePage = BeautifulSoup(webPage, "lxml")

    except Exception as e:
        #print(str(e))
        return []

    result = {}
    result['Platform'] = "N/A"
    result['Year'] = "N/A"
    result['Genre'] = "N/A"
    result['Publisher'] = "N/A"

    table = gamePage.find('table', {"class": "infobox hproduct"})
    if table == None:
        return []
    for tr in table.findAll('tr'):
        for th in tr.findAll('th'):
            if (th.text == 'Publisher' or th.text == 'Publisher(s)' or th.title == "Video game publisher"):
                td = tr.findAll('td')[0]
                publishers = td.text.split('\n')
                publisher = "N/A"
                for p in publishers:
                    if len(p) >= 2:
                        publisher = p

                        break
                result['Publisher'] = publisher.encode('utf-8').strip()

            if (th.text == 'Genre' or th.text == 'Genre(s)' or th.title == "Video game genre"):
                td = tr.findAll('td')[0]
                result['Genre'] = (td.text).strip()

            if (th.text == 'Platform' or th.text == 'Platform(s)' or th.title == "Computing platform"):
                td = tr.findAll('td')[0]
                platform = td.text.split('\n')
                plat = "N/A"
                for p in platform:
                    if len(p) >= 1:
                        plat = p
                        break
                result['Platform'] = plat.strip()

            if (th.text == 'Release' or th.title == "Video game publisher"):
                td = tr.findAll('td')[0]
                date = td.text.split('\n')
                year = "N/A"
                for d in date:
                    if len(d) >= 4 and "," in d:
                        year = d.split(',')[1]
                        break
                result['Year']=year.strip()[:4]

    gameInfo = []
    gameInfo.append(str(result['Platform']).strip())
    gameInfo.append(str(result['Year']).strip())
    gameInfo.append(str(result['Genre']).strip())
    gameInfo.append(str(result['Publisher']).strip())

    if gameInfo.count("N/A") >= 3:
        return []

    return gameInfo



if __name__=="__main__":
    crawlGameInfo()