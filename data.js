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
]

const adds = [{
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
        PhoneNumber: '059876392',
        PlaceOfResidence: 'ein sara street',
        id: '1432',
        password: 'EG@534'
    },
    {
        CustomerName: 'fuaad',
        PhoneNumber: '0592345692',
        PlaceOfResidence: 'khallat agarbeh',
        id: '4532',
        password: 'ER342@'
    },
    {
        CustomerName: 'nermin',
        PhoneNumber: '0599871222',
        PlaceOfResidence: 'khallat reyah',
        id: '81952',
        password: 'GH%$#23'
    }
]

export const employees_data = [{
        EmployeeName: 'mohannad',
        role: 'CSE',
        id: '9474',
        password: 'ET*&534',
        PhoneNumber: '059833392',
    },

]

export const bills_data = [{
        Amount: 140.0,
        PainAmount: 140.0,
        ServiceID: 4
    },
    {
        Amount: 200.0,
        PainAmount: 200.0,
        ServiceID: 4
    }, {
        Amount: 50.0,
        PainAmount: 50.0,
        ServiceID: 4
    }, {
        Amount: 250.0,
        PainAmount: 250.0,
        ServiceID: 5
    }, {
        Amount: 50.0,
        PainAmount: 50.0,
        ServiceID: 5
    }, {
        Amount: 50.0,
        PainAmount: 50.0,
        ServiceID: 5
    },
    {
        Amount: 250.0,
        PainAmount: 250.0,
        ServiceID: 7
    }, {
        Amount: 50.0,
        PainAmount: 50.0,
        ServiceID: 7
    }, {
        Amount: 50.0,
        PainAmount: 50.0,
        ServiceID: 7
    },
]


export const installment_data = [{
    Type: "رسوم اطفاء",
    InstallmentNumber: 99999,
    Amount: 3.0,
    PaymentTimesNumber: 45,
    CustomerID: 2
}, {
    Type: "رسوم اطفاء",
    InstallmentNumber: 99999,
    Amount: 3.0,
    PaymentTimesNumber: 45,
    CustomerID: 1
}, {
    Type: "رسوم اطفاء",
    InstallmentNumber: 99999,
    Amount: 3.0,
    PaymentTimesNumber: 45,
    CustomerID: 3
}, {
    Type: "شحنة ابتدائية",
    InstallmentNumber: 1,
    Amount: 100,
    PaymentTimesNumber: 1,
    CustomerID: 1
}, {
    Type: "شحنة ابتدائية",
    InstallmentNumber: 1,
    Amount: 100,
    PaymentTimesNumber: 1,
    CustomerID: 2
}, {
    Type: "شحنة ابتدائية",
    InstallmentNumber: 1,
    Amount: 100,
    PaymentTimesNumber: 1,
    CustomerID: 3
}, {
    Type: "رسوم نفايات",
    InstallmentNumber: 5,
    Amount: 78,
    PaymentTimesNumber: 5,
    CustomerID: 1
}, {
    Type: "رسوم نفايات",
    InstallmentNumber: 5,
    Amount: 78,
    PaymentTimesNumber: 5,
    CustomerID: 2
}, {
    Type: "رسوم نفايات",
    InstallmentNumber: 5,
    Amount: 78,
    PaymentTimesNumber: 5,
    CustomerID: 3
}, {
    Type: "انارة شوارع",
    InstallmentNumber: 7,
    Amount: 2,
    PaymentTimesNumber: 6,
    CustomerID: 1
}]