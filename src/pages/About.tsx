
const About = () => {
  return (
    <div className="min-h-screen bg-accent/30 relative">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Larger Logo */}
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-8">
              {/* Large floating logo */}
              <div className="relative mb-6">
                <img 
                  src="/lovable-uploads/f8ce03ed-3477-4aff-985d-d166b46d732e.png" 
                  alt="Little Knots by Harsha Logo" 
                  className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 animate-bounce-gentle drop-shadow-lg"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl -z-10"></div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                About Little Knots by Harsha
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Welcome to our world of handmade crochet artistry, where every stitch tells a story
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-12 border border-primary/10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <img 
                src="/lovable-uploads/f8ce03ed-3477-4aff-985d-d166b46d732e.png" 
                alt="Section Logo" 
                className="h-8 w-8 mr-3"
              />
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p className="mb-6">
                Little Knots by Harsha was born from a passion for creating beautiful, functional art with yarn and hook. 
                What started as a hobby has blossomed into a labor of love, bringing unique, handmade items to 
                people who appreciate the beauty of traditional craftsmanship.
              </p>
              <p className="mb-6">
                Every piece in our collection is carefully crafted by hand, using only premium materials and 
                time-tested techniques. We believe that in our fast-paced world, there's something truly 
                special about owning something made with patience, skill, and love.
              </p>
              <p>
                From cozy accessories to playful toys and practical bags, each item carries the warmth and 
                care that only handmade products can provide.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center border border-primary/10 hover:border-primary/20 transition-all hover:shadow-xl">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We use eco-friendly materials and sustainable practices in all our creations.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center border border-primary/10 hover:border-primary/20 transition-all hover:shadow-xl">
              <div className="text-4xl mb-4">✋</div>
              <h3 className="text-xl font-semibold mb-3">Handmade Quality</h3>
              <p className="text-gray-600">
                Every stitch is placed with care, ensuring durability and beauty in each piece.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center border border-primary/10 hover:border-primary/20 transition-all hover:shadow-xl">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Unique Designs</h3>
              <p className="text-gray-600">
                Original patterns and creative color combinations make each item one-of-a-kind.
              </p>
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-primary/10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <img 
                src="/lovable-uploads/f8ce03ed-3477-4aff-985d-d166b46d732e.png" 
                alt="Section Logo" 
                className="h-8 w-8 mr-3"
              />
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Material Selection</h3>
                <p className="text-gray-600 mb-4">
                  We carefully source premium cotton, wool, and specialty yarns from trusted suppliers, 
                  ensuring every material meets our high standards for quality and sustainability.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Crafting</h3>
                <p className="text-gray-600 mb-4">
                  Each item is meticulously handcrafted using traditional crochet techniques, 
                  with attention to every detail from the first stitch to the final finishing touches.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Quality Control</h3>
                <p className="text-gray-600 mb-4">
                  Before any item leaves our workshop, it undergoes thorough quality checks to ensure 
                  it meets our standards for durability, appearance, and craftsmanship.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Packaging</h3>
                <p className="text-gray-600 mb-4">
                  Your items are carefully packaged with eco-friendly materials to ensure they arrive 
                  in perfect condition, ready to bring joy to your life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
