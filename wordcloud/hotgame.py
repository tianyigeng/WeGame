#coding=utf8
# note: reference words type from arial.ttf
# background picture retrieved from internet
import random

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

#去除停用词，并统计词频
def word_freq():
    fr = open("stopwords.txt", "r")
    stopwords = []
    for line in fr:
        curline = line.strip("\n").split("\t")
        stopwords.append(curline[0])   
 
    fr = open("data1.txt", "r")
    word_freq_dict = {}
    for line in fr:
        curline = line.split(" ")
        for w in curline:
            if w in stopwords:
                continue
            if w not in word_freq_dict:
                word_freq_dict[w] = 0
            word_freq_dict[w] += 1
    return word_freq_dict

#随机获取颜色
def get_color():
    colors = [(104, 104, 220),(188, 188, 246),(43, 43, 186),(255, 175, 97),(255, 219, 184),(255, 139, 24),(255, 215, 97),(255, 237, 184),(255, 197, 24)]
    return colors[random.randint(0,len(colors)-1)]
#获取图片位置
def get_position(width, height):
    width_rand = random.randint(0, width+40)
    height_rand = random.randint(0, height+40)
    return (width_rand, height_rand)

if __name__ == "__main__":
    iList = 50
    word_frequency = word_freq() 
    word_sort = sorted(word_frequency.items(), key=lambda d:d[1], reverse=True)[0:iList]
#    for word, freq in word_sort:
#        print (word, freq)
#    print (len(word_sort))
    if len(word_sort) <= 0:
        raise ValueError("ERROR : the number of words needs to be more than ZERO.")
#统计所有词出现的总次数
    freq_sum = 0
    for word, freq in word_sort:
        freq_sum += freq
#画图
    im01 = Image.open('background.png')
    for word, freq in word_sort:
        #获取图片的宽、长
        width, height = im01.size
        #计算词在图片上展示的相对大小
        ##其中290是个需要手动调整的参数，根据输入文件词的数量多少, 它的大小可能从10-几万不等
        font_size = int((2 * freq / freq_sum) * 430)
        draw = ImageDraw.Draw(im01)
        #arial.ttf这个文件是从网上下载的，指定字体的
        font = ImageFont.truetype("Candara.ttf", font_size)
        draw.text(get_position(width, height),word, fill = get_color(), font=font)
  #      draw.text(get_position(width, height),word, fill = get_color(), font=font)
#输出，保存在当前目录，文件是out.png,
    im01.save("out.png")
    im01.save("/home/hzhan107/411FinalProject/WeGame/wegameFront/wegame/src/assest")




























