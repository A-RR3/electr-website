export const news = [{
        // id: 1,
        title: 'إعلان قطع التيار الكهربائي ',
        image: 'https://www.hepco-pal.com/application/files/5215/3043/4734/d8e4b052906eee52430bd264f536bb25.jpg',
        // date: '12/4/2022',
        body: `تعلن كهرباء الخليل عن قطع التيار الكهربائي وجمع بيانات للشبكة يوم الثلاثاء الموافق 14/03/2023`,
    },
    {
        // id: 2,
        title: 'عطاء توفير خدمات النظافة',
        image: 'https://www.hepco-pal.com/application/files/5415/3242/4241/642a0fd3fd0b4d1cd0085a4cddc95d5e.jpg',
        // date: '23/1/2023',

        body: `عطاء توفير خدمات النظافة في مرافق كهرباء الخليل للمرة الثانية 2023/2 `,
    },
    {
        // id: 3,
        title: 'albany sectional',
        image: 'https://dl.airtable.com/.attachments/05ecddf7ac8d581ecc3f7922415e7907/a4242abc/product-1.jpeg',
        // date: '20/2/2023',
        body: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
    },
    {
        // id: 4,
        title: 'leather sofa',
        image: 'https://dl.airtable.com/.attachments/3245c726ee77d73702ba8c3310639727/f000842b/product-5.jpg',
        // date: '19/3/2023',
        body: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
    },
]

const services = [{
        id: 1,
        name: 'إعلان قطع التيار الكهربائي ',
        image: 'https://www.hepco-pal.com/application/files/5215/3043/4734/d8e4b052906eee52430bd264f536bb25.jpg',
        date: '12/4/2022',
        desc: `تعلن كهرباء الخليل عن قطع التيار الكهربائي وجمع بيانات للشبكة يوم الثلاثاء الموافق 14/03/2023`,
    },
    {
        id: 2,
        name: 'عطاء توفير خدمات النظافة',
        image: 'https://www.hepco-pal.com/application/files/5415/3242/4241/642a0fd3fd0b4d1cd0085a4cddc95d5e.jpg',
        date: '23/1/2023',

        desc: `عطاء توفير خدمات النظافة في مرافق كهرباء الخليل للمرة الثانية 2023/2 `,
    },
    {
        id: 3,
        name: 'albany sectional',
        image: 'https://dl.airtable.com/.attachments/05ecddf7ac8d581ecc3f7922415e7907/a4242abc/product-1.jpeg',
        date: '20/2/2023',
        desc: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
    },
    {
        id: 4,
        name: 'leather sofa',
        image: 'https://dl.airtable.com/.attachments/3245c726ee77d73702ba8c3310639727/f000842b/product-5.jpg',
        date: '19/3/2023',
        desc: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
    },
]

export const req_type = [
    { TypeName: ' اعتراض على تقدير بدل استهلاك' },
    { TypeName: 'تحويل من فاتورة الى كرت' },
    { TypeName: 'فحص عداد' },
    { TypeName: 'تركيب انارة' },
    { TypeName: 'صيانة' },
    { TypeName: 'تخفيض اقساط' },
    { TypeName: 'مشكلة ضعف التيار' },
    { TypeName: 'تعديل التعرفة' },
]

export const req_status = [
    { StatusName: 'طلب جديد' },
    { StatusName: 'دفع رسوم' },
    { StatusName: 'قيد الكشف' },
    { StatusName: 'تم الكشف' },
    { StatusName: 'معتمد فنيا' },
    { StatusName: 'مدفوع والى التركيب' },
    { StatusName: 'قيد التركيب' },
    { StatusName: 'قيد التجهيز' },
    { StatusName: 'قيد فحص التمديدات' },
    { StatusName: 'تم فحص التمديدات' },
    { StatusName: 'جاهز لتركيب العداد' },
    { StatusName: 'جاهز لتركيب الاعمدة' },
    { StatusName: 'جاهز لتركيب الشبكة' },
    { StatusName: 'تم التركيب' },
    { StatusName: 'تم تركيب جزئي' },
    { StatusName: 'مرفوض' },
    { StatusName: 'ملغي' }
]
export const customers_data = [{
        CustomerName: 'rami',
        PlaceOfResidence: 'ein sara street',
        PhoneNumber: '06343664335'
    },
    {
        CustomerName: 'nermin',
        PlaceOfResidence: 'magarbeh street',
        PhoneNumber: '06346664335'
    }
]

export const services_data = [{
        SubscriptionType: 'card',
        Address: 'ein sara',
        SubscriptionStatus: 'temporarely',
        CustomerID: '1'
    },
    {
        SubscriptionType: 'bill',
        Address: 'wad abu rumman',
        SubscriptionStatus: 'permanent',
        CustomerID: '1'
    },

]



// module.exports = { news, services }