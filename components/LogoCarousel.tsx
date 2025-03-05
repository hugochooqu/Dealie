const companies = [
    { id: 1, logo: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cleanpng.com%2Ffree%2Fmcdonalds-logo.html&psig=AOvVaw0NVrWoG7smPxcBioi3jkAm&ust=1741100765810000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCKDSz_eX7osDFQAAAAAdAAAAABAE' },
    { id: 2, logo: "https://via.placeholder.com/150x50?text=Company+2" },
    { id: 3, logo: "https://via.placeholder.com/150x50?text=Company+3" },
    { id: 4, logo: "https://via.placeholder.com/150x50?text=Company+4" },
    { id: 5, logo: "https://via.placeholder.com/150x50?text=Company+5" },
    { id: 6, logo: "https://via.placeholder.com/150x50?text=Company+6" },
    { id: 7, logo: "https://via.placeholder.com/150x50?text=Company+7" },
    { id: 8, logo: "https://via.placeholder.com/150x50?text=Company+8" },
  ];
  
  const LogoCarousel = () => {
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold text-gray-600 mb-8">
            Trusted by the best companies
          </h2>
          <div className="relative overflow-hidden">
            {/* Carousel Container */}
            <div className="flex animate-marquee whitespace-nowrap">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex-shrink-0 mx-8"
                >
                  <img
                    src={company.logo}
                    alt={`Company ${company.id}`}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
              {/* Duplicate logos for infinite scroll effect */}
              {companies.map((company) => (
                <div
                  key={`duplicate-${company.id}`}
                  className="flex-shrink-0 mx-8"
                >
                  <img
                    src={company.logo}
                    alt={`Company ${company.id}`}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoCarousel;