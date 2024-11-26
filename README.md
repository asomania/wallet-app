<h1>Proje Kurulum Kılavuzu</h1>

<h1>Uyarı : Paketleri kurar iken --force ile kurulması gerekmektedir</h1>
Bu proje, bir Flask backend uygulaması ve React frontend uygulaması ile bütçe yönetimi ve öneriler sunmayı amaçlamaktadır.

    Bütçe Takibi ve Öneri Sistemi
    Bu proje, kullanıcılara bütçelerini takip etmelerine yardımcı olmayı amaçlayan bir uygulamadır. 
    Kullanıcılar, gelir ve giderlerini kaydedebilir, belirledikleri limitlere göre öneriler
    alabilir ve bütçelerini optimize edebilirler. Uygulama, iki ana bileşenden oluşmaktadır: 
    Backend ve Frontend. Backend, verileri işlemek ve          
    önerilerde bulunmak için Flask kullanırken, Frontend kısmı ise React.js ile oluşturulmuştur.
    
        Kullanılan Teknolojiler
        
        Backend (Flask)
    Python 3.x: Backend geliştirme için kullanılan programlama dili.
    Flask: Python tabanlı hafif bir web framework’ü. API oluşturmak için kullanıldı.
    Flask-CORS: Cross-Origin Resource Sharing (CORS) yönetimini sağlamak için kullanıldı.
    JSON: API üzerinden veri iletimi için kullanılan format.
        Frontend (React)
    React.js: Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi.
    Redux: Uygulama durum yönetimi için kullanıldı.
    Chart.js: Görselleştirme amacıyla grafikler oluşturmak için kullanıldı.
    Axios: API'den veri almak için kullanılan kütüphane.
        
        Diğer Araçlar
    npm: Node.js paket yöneticisi, frontend bağımlılıklarını yönetmek için kullanıldı.
    Python Pip: Backend bağımlılıklarını yönetmek için kullanıldı.
        
        Gereksinimler
    Backend Gereksinimleri
    Python 3.x: Python 3 veya üstü bir sürüm yüklü olmalıdır.
    pip: Python bağımlılıklarını yüklemek için kullanılır.
    Flask ve Flask-CORS gibi Python paketleri gereklidir.
    Frontend Gereksinimleri
    Node.js: Frontend için gerekli olan JavaScript çalıştırma ortamı.
    npm: Frontend bağımlılıklarını yüklemek için kullanılır.
        
        Kurulum
    Backend Kurulumu
    Sanal Ortam Kurulumu (Opsiyonel): Sanal bir ortam oluşturup aktif edebilirsiniz.
    Bu, sistemdeki diğer Python projelerinden izole olmanızı sağlar.
    
    Bağımlılıkları Yükleyin: Backend bağımlılıklarını yüklemek için aşağıdaki komutu çalıştırın:
    
    pip install -r requirements.txt
    Backend Uygulamasını Çalıştırın: Flask uygulamasını çalıştırmak için:
    
    python app.py
    Backend, varsayılan olarak http://127.0.0.1:5000 adresinde çalışacaktır.
    
    Frontend Kurulumu
    Node.js ve npm Yükleyin: Frontend için Node.js'i buradan indirip yükleyin.
    
    Frontend Bağımlılıklarını Yükleyin: React uygulamasını çalıştırmak için, 
    öncelikle bağımlılıkları yüklemeniz gerekir:
    
    npm install
    Frontend Uygulamasını Çalıştırın: React uygulamasını başlatmak için:
    
    npm start
    Frontend, varsayılan olarak http://localhost:3000 adresinde çalışacaktır.
    
    Proje Yapısı
    Proje dizini şu şekilde yapılandırılmıştır:
    
    /project-root
    ├── /recommendationApi
    │   ├── app.py              # Flask API uygulaması
    │   ├── requirements.txt    # Backend bağımlılıkları
    └── /
        ├── src/app
        │   ├── /components     # React bileşenleri
        │   └── /hooks
            └── /store          # Custom Hookslar ve Redux Store 
            └── /(group)        # Burda bir group oluşturulup aynı layout üzerine inşa edildi
        ├── package.json        # Frontend bağımlılıkları
        └── ...
        
        Proje Açıklaması
    Bu proje, kullanıcıların bütçe yönetimlerini kolaylaştırmayı hedefler. Kullanıcılar, 
    gelir ve giderlerini sisteme kaydedebilir,grafikte aylara göre görebilir 
    her bir kategoriye belirledikleri bütçelere göre,sistem öneriler sunar.
    Öneriler, harcamaların belirlenen limitlere ne kadar yaklaştığını, 
    aşan kategorilerde kullanıcıyı uyarmak amacıyla sunulur. 
    Kullanıcı limiti aşarsa bildirim gönderilir.
    Tarihe göre ve ismi göre filtreleme yapabilir. 
    Dark mode ve light mode.
    
        Özellikler
    Gelir ve Gider Takibi: Kullanıcılar gelir ve giderlerini kategorilere ayırarak kaydedebilir.
    Gelir ve Gider takibinin grafikte yansıtılması.
    Bütçe Sınırları: Her bir kategori için belirli bir bütçe limiti tanımlanabilir.
    Harcamalar için Uyarılar: Eğer harcamalar belirlenen sınırların %80’ini aşarsa,
    kullanıcıya bir uyarı gönderilir.
    Dark ve Light mode destegi.
    Responsive tasarım.
    Tarih ve isime göre filtreleme.
    
        Yardım ve Destek
    Herhangi bir sorun olursa bana bildirebilirsiniz.
    Yardımcı olmaktan memnuniyet duyarım.
    
    Bu açıklama, projeyi kurmak ve çalıştırmak için gerekli adımları adım adım izleyerek başlatılabilir. 
    Uygulama hem backend hem de frontend tarafında kullanıcıların bütçe 
    yönetimini optimize etmeyi amaçlayan etkileşimli bir yapıya sahiptir.
