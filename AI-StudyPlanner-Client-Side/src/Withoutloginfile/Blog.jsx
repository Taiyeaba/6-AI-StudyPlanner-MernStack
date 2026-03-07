import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaArrowRight, FaBookmark, FaShare, FaHeart, FaComment } from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 6 },
    { id: 'study-tips', name: 'Study Tips', count: 2 },
    { id: 'productivity', name: 'Productivity', count: 2 },
    { id: 'exam-prep', name: 'Exam Prep', count: 1 },
    { id: 'student-life', name: 'Student Life', count: 1 }
  ];

 
  const featuredPosts = [
    {
      id: 1,
      title: "10 Proven Study Techniques That Actually Work",
      excerpt: "Backed by research and tested by thousands of students. Learn how to retain more information in less time.",
      author: "Dr. Sarah Johnson",
      authorImage: "https://i.pravatar.cc/150?img=1",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "study-tips",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 234,
      comments: 45,
      slug: "10-proven-study-techniques"
    },
    {
      id: 2,
      title: "How to Stay Motivated During Exam Season",
      excerpt: "Exam stress getting to you? Here's how top students maintain their motivation when it matters most.",
      author: "Michael Chen",
      authorImage: "https://i.pravatar.cc/150?img=2",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "exam-prep",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 189,
      comments: 32,
      slug: "stay-motivated-during-exams"
    },
    {
      id: 3,
      title: "The Pomodoro Technique: A Student's Guide",
      excerpt: "Master the famous time management method that helps students study smarter, not harder.",
      author: "Emily Rodriguez",
      authorImage: "https://i.pravatar.cc/150?img=3",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "productivity",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 28,
      slug: "pomodoro-technique-guide"
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: "Digital vs Traditional Note-Taking: What's Better?",
      excerpt: "We compare both methods to help you decide which works best for your learning style.",
      author: "David Kim",
      authorImage: "https://i.pravatar.cc/150?img=4",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "study-tips",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "digital-vs-traditional-note-taking",
      likes: 142,
      comments: 23
    },
    {
      id: 5,
      title: "Creating the Perfect Study Space",
      excerpt: "How to set up your environment for maximum focus and productivity.",
      author: "Lisa Wang",
      authorImage: "https://i.pravatar.cc/150?img=5",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "productivity",
       image: "https://i.ibb.co.com/v6P2vh3m/istockphoto-944631208-612x612.jpg",  
      slug: "perfect-study-space",
      likes: 98,
      comments: 15
    },
    {
      id: 6,
      title: "Managing Stress During Finals Week",
      excerpt: "Mental health tips from students who've been through it all.",
      author: "Dr. James Wilson",
      authorImage: "https://i.pravatar.cc/150?img=6",
      date: "March 3, 2024",
      readTime: "6 min read",
      category: "student-life",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "managing-stress-finals",
      likes: 210,
      comments: 38
    }
  ];

  const allPosts = [...featuredPosts, ...recentPosts];

  const filteredPosts = allPosts.filter(post => 
    (selectedCategory === 'all' || post.category === selectedCategory) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryStyle = (category) => {
    const styles = {
      'study-tips': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'productivity': 'bg-green-500/20 text-green-400 border-green-500/30',
      'exam-prep': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'student-life': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return styles[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
       
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          The{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Study Blog
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
          Tips, strategies, and stories from students and experts to help you succeed
        </p>

       
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {category.name}
              <span className="text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
          Featured Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <div key={post.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-indigo-600 transition-colors">
                      <FaBookmark className="text-white text-sm" />
                    </button>
                    <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-indigo-600 transition-colors">
                      <FaShare className="text-white text-sm" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryStyle(post.category)}`}>
                      {post.category === 'study-tips' ? '📚 Study Tips' : 
                       post.category === 'productivity' ? '⚡ Productivity' :
                       post.category === 'exam-prep' ? '📝 Exam Prep' : '🎓 Student Life'}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={post.authorImage} 
                    alt={post.author} 
                    className="w-8 h-8 rounded-full ring-2 ring-indigo-500/50"
                    onError={(e) => {
                      e.target.src = 'https://i.pravatar.cc/150?img=1';
                    }}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{post.author}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-indigo-400" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
                      <FaHeart className="text-xs" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                      <FaComment className="text-xs" /> {post.comments}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-sm font-medium group">
                    Read More 
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
            Recent Posts
          </h2>
          <Link to="/blog/all" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-sm font-medium group">
            View All 
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <div key={post.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300">
              <div className="flex gap-4">
                <Link to={`/blog/${post.slug}`} className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-4 h-4 rounded-full inline-block mr-1"
                      onError={(e) => {
                        e.target.src = 'https://i.pravatar.cc/150?img=1';
                      }}
                    />
                    {post.author} • {post.readTime}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1">
                    Read More 
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
};

export default Blog;