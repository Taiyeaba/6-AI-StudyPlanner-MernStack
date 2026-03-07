import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaArrowRight, FaHeart, FaComment, FaBookmark, FaShare } from 'react-icons/fa';

const BlogDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 6 },
    { id: 'study-tips', name: 'Study Tips', count: 2 },
    { id: 'productivity', name: 'Productivity', count: 2 },
    { id: 'exam-prep', name: 'Exam Prep', count: 1 },
    { id: 'student-life', name: 'Student Life', count: 1 }
  ];

  const allPosts = [
    {
      id: 1,
      title: "10 Proven Study Techniques That Actually Work",
      excerpt: "Backed by research and tested by thousands of students.",
      author: "Dr. Sarah Johnson",
      authorImage: "https://i.pravatar.cc/150?img=1",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "study-tips",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "10-proven-study-techniques",
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      title: "How to Stay Motivated During Exam Season",
      excerpt: "Tips from top students on maintaining motivation.",
      author: "Michael Chen",
      authorImage: "https://i.pravatar.cc/150?img=2",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "exam-prep",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "stay-motivated-during-exams",
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      title: "The Pomodoro Technique: A Student's Guide",
      excerpt: "Master this powerful time management method.",
      author: "Emily Rodriguez",
      authorImage: "https://i.pravatar.cc/150?img=3",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "productivity",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "pomodoro-technique-guide",
      likes: 156,
      comments: 28
    },
    {
      id: 4,
      title: "Digital vs Traditional Note-Taking",
      excerpt: "Which method works best for different learning styles?",
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
      excerpt: "Set up your environment for maximum focus.",
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
      excerpt: "Mental health strategies for exam season.",
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

  const filteredPosts = allPosts.filter(post => 
    (selectedCategory === 'all' || post.category === selectedCategory) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
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
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full mb-6">
            <span className="text-indigo-300">📚</span>
            <span className="text-sm text-gray-300">All Articles</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            All{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Blog Posts
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Browse our complete collection of study tips and resources
          </p>

         
        </div>

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

        {/* Posts Grid  */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
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

        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;