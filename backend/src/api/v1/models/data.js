const data = {
  category: [
    {
      id: 1,
      name: "Điện Thoại & Phụ Kiện",
      image: "",
      description: "",
    },
    {
      id: 2,
      name: "Thiết bị điện tử",
      image: "",
      description: "",
    },
    {
      id: 3,
      name: "Máy Tính & Laptop",
      image: "",
      description: "",
    },
    {
      id: 4,
      name: "Thời Trang Nam",
      image: "",
      description: "",
    },
    {
      id: 5,
      name: "Nhà Sách",
      image: "",
      description: "",
    },
  ],

  subCategory: [
    {
      id: 1,
      name: "Điện thoại",
      image: "",
      description: "",
      categoryId: 1,
    },
    {
      id: 2,
      name: "Máy tính bảng",
      image: "",
      description: "",
      categoryId: 1,
    },
    {
      id: 3,
      name: "Áo khoác",
      image: "",
      description: "",
      categoryId: 4,
    },
    {
      id: 4,
      name: "Quần dài",
      image: "",
      description: "",
      categoryId: 4,
    },
  ],

  user: [
    {
      id: 1,
      username: "nam",
      password: "$2b$11$SZeEhx.r.Rh4rHs72HTLa.XIbucJmfVkB9tqyR/hhBJ8OlnO176z6", //1
      email: "dangngochoainam0601@gmail.com",
      firstname: "Nam",
      lastname: "Đặng",
      avatar: "",
      phone: "",
      roles: "ADMIN",
      birthday: "2001-01-06 6:00:00",
      address: "Mỹ Đức - Tây An - Tây Sơn - Bình Định",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
    },
    {
      id: 2,
      username: "duyen",
      password: "$2b$11$SZeEhx.r.Rh4rHs72HTLa.XIbucJmfVkB9tqyR/hhBJ8OlnO176z6", //1
      email: "dangthileduyen@gmail.com",
      firstname: "Duyên",
      lastname: "Đặng",
      avatar: "",
      phone: "",
      roles: "CUSTOMER",
      birthday: "1964-11-15 6:00:00",
      address: "Mỹ Đức - Tây An - Tây Sơn - Bình Định",
      createdAt: "2022-09-16 17:59:59",
      updatedAt: "2022-09-16 19:59:59",
    },
    {
      id: 3,
      username: "hang",
      password: "$2b$11$SZeEhx.r.Rh4rHs72HTLa.XIbucJmfVkB9tqyR/hhBJ8OlnO176z6", //1
      email: "trandangthanhhang@gmail.com",
      firstname: "Hằng",
      lastname: "Trần",
      avatar: "",
      phone: "",
      roles: "STAFF",
      birthday: "1998-02-04 6:00:00",
      address: "Mỹ Đức - Tây An - Tây Sơn - Bình Định",
      createdAt: "2022-09-16 16:59:59",
      updatedAt: "2022-09-16 19:59:59",
    },
    {
      id: 4,
      username: "mai",
      password: "$2b$11$SZeEhx.r.Rh4rHs72HTLa.XIbucJmfVkB9tqyR/hhBJ8OlnO176z6", //1
      email: "phuonghuynhmai@gmail.com",
      firstname: "Mai",
      lastname: "Phương",
      avatar: "",
      phone: "",
      roles: "CUSTOMER,SELLER",
      birthday: "2001-04-28 6:00:00",
      address: "Lai Vung - Đồng Tháp",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
    },
  ],

  seller: [
    {
      id: 1,
      type: "Nhà bán lẻ",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      userId: 4,
    },
  ],

  shop: [
    {
      id: 1,
      name: "Mai Phương Shop",
      rate: null,
      description: "",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      sellerId: 1,
    },
  ],

  promotion: [
    {
      id: 1,
      type: "PERCENT",
      code: "abcd060120kshd",
      value: 0.3,
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      shopId: 1,
    },
    {
      id: 2,
      type: "POINT",
      code: "abcd060120kshd",
      value: 0.2,
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      shopId: 1,
    },
  ],

  product: [
    {
      id: 1,
      name: "iphone 14 pro",
      price: 37000000,
      description:
        "Thanh lịch, hiện đại trong từng đường nét.Thừa hưởng phong cách thiết kế tối giản, hiện đại của thế hệ iPhone 13 series, iPhone 14 Pro vẫn sở hữu cạnh viền vát phẳng và hệ thống camera được bố trí một cách hợp lý trong một cụm hình vuông. Giờ đây cụm tai thỏ quen thuộc đã được loại bỏ và thay thế vào đó là hình notch độc đáo dễ nhận diện.",
      image: "",
      unitInStock: 100,
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      shopId: 1,
      promotionId: 1,
      categoryId: 1,
      subCategoryId: 1,
    },
    {
      id: 2,
      name: "trí tuệ do thái",
      price: 110000,
      description:
        "Trí tuệ Do Thái là một cuốn sách tư duy đầy tham vọng trong việc nâng cao khả năng tự học tập, ghi nhớ và phân tích - những điều đã khiến người Do Thái vượt trội lên, chiếm lĩnh những vị trí quan trọng trong ngành truyền thông, ngân hàng và những giải thưởng sáng tạo trên thế giới.",
      image: "",
      unitInStock: 100,
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      shopId: 1,
      promotionId: 2,
      categoryId: 5,
      subCategoryId: null,
    },
  ],

  address: [
    {
      id: 1,
      city: "Quy Nhơn",
      district: "Bình Định",
      ward: "Tây Sơn",
      street: "Tây An",
      detail: "Mỹ Đức - Tây An - Tây Sơn - Bình Định",
      userId: 1,
    },
    {
      id: 2,
      city: "Quy Nhơn",
      district: "Bình Định",
      ward: "Tây Sơn",
      street: "Tây An",
      detail: "Xóm 3 - Mỹ Đức - Tây An - Tây Sơn - Bình Định",
      userId: 2,
    },
  ],

  payment: [
    {
      id: 1,
      bank: "Agribank",
      account: "1951052122",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      userId: 1,
    },
    {
      id: 2,
      bank: "LienVietPostBank",
      account: "1951052122",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      userId: 2,
    },
  ],

  notification: [
    {
      id: 1,
      content: "Nam Đặng đã thích sản phẩm này",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      type: "PRODUCT",
      valueId: 1,
      sourceUserId: 4, //user nhận thông báo
      creatorId: 1,
    },
    {
      id: 2,
      content: "Duyên Đặng đã thích sản phẩm này",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      type: "PRODUCT",
      valueId: 2,
      sourceUserId: 4, //user nhận thông báo
      creatorId: 2,
    },
  ],

  historySearch: [
    {
      id: 1,
      keyword: "iphone",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
    },
    {
      id: 2,
      keyword: "Apple Watch",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
    },
  ],

  userSearch: [
    {
      id: 1,
      userId: 2,
      historySearchId: 1,
    },
    {
      id: 2,
      userId: 2,
      historySearchId: 2,
    },
    {
      id: 3,
      userId: 3,
      historySearchId: 2,
    },
  ],

  customer: [
    {
      id: 1,
      userId: 2,
    },
    {
      id: 2,
      userId: 4,
    },
  ],

  staff: [
    {
      id: 1,
      hireDate: "2022-09-16 18:59:59",
      userId: 3,
    },
  ],

  admin: [
    {
      id: 1,
      userId: 1,
    },
  ],

  order: [
    {
      id: 1,
      shipAddress: "Mỹ Đức - Tây An - Tây Sơn - Bình Định",
      payment: "Thanh toán online",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      customerId: 2,
      isConfirm: true,
      shipperId: 1,
      shopId: 1,
    },
  ],

  orderDetails: [
    {
      id: 1,
      quantity: 2,
      unitPrice: 170000,
      discount: 0.1,
      productId: 2,
      orderId: 1,
    },
    {
      id: 2,
      quantity: 1,
      unitPrice: 37000000,
      discount: 0.1,
      productId: 1,
      orderId: 1,
    },
  ],

  review: [
    {
      id: 1,
      rate: 5,
      content: "Sản phẩm tuyệt vời",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      customerId: 1,
      productId: 1,
    },
    {
      id: 2,
      rate: 5,
      content: "Sách hay",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      customerId: 2,
      productId: 2,
    },
  ],

  comment: [
    {
      id: 1,
      content: "Sách rất hay, nên mua",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      creatorId: 2,
      productId: 2,
    },
    {
      id: 2,
      content: "Cuốn sách này đã thay đổi cuộc đời tôi",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      creatorId: 4,
      productId: 2,
    },
  ],

  subComment: [
    {
      id: 1,
      content: "Tôi đồng ý với ý kiến của bạn",
      createdAt: "2022-09-16 18:59:59",
      updatedAt: "2022-09-16 19:59:59",
      creatorId: 4,
      commentId: 1,
    },
  ],
};

module.exports = data;
