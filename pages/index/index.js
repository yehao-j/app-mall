const WXAPI = require('apifm-wxapi')

const app = getApp()

Page({
  data: {
    banners: [],
    categories: [],
    curPage: 0,
  },

  onLoad() {
    this.initBanners();
    this.initCategories();
    this.getNotice();
    this.adPosition();
  },

  async initBanners() {
    const _data = {}
    // 读取头部轮播图
    const res = await WXAPI.banners({
      type: 'index'
    })
    if (res.code == 700) {
      wx.showModal({
        title: '提示',
        content: '请在后台添加 banner 轮播图片，自定义类型填写 index',
        showCancel: false
      })
    } else {
      this.setData({banners: res.data})
    }
  },

  async initCategories() {
    const res = await WXAPI.goodsCategory()
    let categories = [];
    if (res.code == 0) {
      const _categories = res.data.filter(ele => {
        return ele.level == 1
      })
      categories = categories.concat(_categories)
    }
    this.setData({
      categories: categories,
      curPage: 1
    });
    // this.getGoodsList(0);
  },

  async getNotice() {
    var that = this;
    const res = await WXAPI.noticeList({pageSize: 5})
    if (res.code == 0) {
      if (res.data.dataList.length > 0) {
        that.setData({
          notice: res.data.dataList[0]
        });
      }
    }
  },

  async adPosition() {
    let res = await WXAPI.adPosition('indexPop')
    console.log(res);
    if (res.code == 0) {
      this.setData({
        adPositionIndexPop: res.data
      })
    }
    
    res = await WXAPI.adPosition('index-live-pic')
    if (res.code == 0) {
      this.setData({
        adPositionIndexLivePic: res.data
      })
    }
  },

  tapBanner(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  tabClick(e) {
    console.log(e.currentTarget.dataset.id);
    // 商品分类点击
    // const category = this.data.categories.find(ele => {
    //   return ele.id == e.currentTarget.dataset.id
    // })
    // if (category.vopCid1 || category.vopCid2) {
    //   wx.navigateTo({
    //     url: '/pages/goods/list-vop?cid1=' + (category.vopCid1 ? category.vopCid1 : '') + '&cid2=' + (category.vopCid2 ? category.vopCid2 : ''),
    //   })
    // } else {
    //   wx.setStorageSync("_categoryId", category.id)
    //   wx.switchTab({
    //     url: '/pages/category/category',
    //   })
    // }
  },
})
