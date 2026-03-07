import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaShare, FaBookmark, FaHeart, FaComment } from 'react-icons/fa';

const BlogPost = () => {
  const { slug } = useParams();

  const allPosts = [
    {
      id: 1,
      slug: "10-proven-study-techniques",
      title: "10 Proven Study Techniques That Actually Work",
      content: `
        <p>Studying effectively is not about how many hours you put in, but how you use those hours. Here are 10 research-backed techniques that can transform your study sessions.</p>
        
        <h2>1. The Pomodoro Technique</h2>
        <p>Work in focused 25-minute intervals followed by 5-minute breaks. This technique prevents burnout and maintains high concentration levels.</p>
        
        <h2>2. Active Recall</h2>
        <p>Instead of passively reading, test yourself on the material. Close the book and try to remember key concepts. This strengthens neural pathways.</p>
        
        <h2>3. Spaced Repetition</h2>
        <p>Review material at increasing intervals. Apps like Anki can help you implement this technique effectively.</p>
        
        <h2>4. The Feynman Technique</h2>
        <p>Explain concepts in simple terms as if teaching someone else. If you can't explain it simply, you don't understand it well enough.</p>
        
        <h2>5. Mind Mapping</h2>
        <p>Create visual representations of information. This helps see connections between different concepts.</p>
        
        <h2>6. Interleaved Practice</h2>
        <p>Mix different topics or types of problems in one study session. This improves problem-solving skills.</p>
        
        <h2>7. Elaborative Interrogation</h2>
        <p>Ask "why" questions about the material. This deepens understanding and creates stronger memories.</p>
        
        <h2>8. Self-Explanation</h2>
        <p>Explain how new information relates to what you already know. This creates meaningful connections.</p>
        
        <h2>9. Practice Testing</h2>
        <p>Take practice tests under exam conditions. This reduces anxiety and improves performance.</p>
        
        <h2>10. Study Groups</h2>
        <p>Discuss material with peers. Teaching others and hearing different perspectives reinforces learning.</p>
        
        <p>Remember, everyone learns differently. Experiment with these techniques to find what works best for you. The key is consistency and active engagement with the material.</p>
      `,
      author: "Dr. Sarah Johnson",
      authorImage: "https://i.pravatar.cc/150?img=1",
      authorBio: "PhD in Educational Psychology with 15 years of teaching experience. Passionate about helping students learn effectively.",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "study-tips",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 234,
      comments: 45,
      tags: ["Study Tips", "Productivity", "Learning Techniques"]
    },
    {
      id: 2,
      slug: "stay-motivated-during-exams",
      title: "How to Stay Motivated During Exam Season",
      content: `
        <p>Exam season can be stressful, but staying motivated is key to success. Here are proven strategies to keep your momentum going.</p>
        
        <h2>1. Set Clear Goals</h2>
        <p>Break down your study material into daily and weekly goals. Small achievements keep you motivated.</p>
        
        <h2>2. Create a Reward System</h2>
        <p>Reward yourself after completing each study session. This could be a short break, a snack, or an episode of your favorite show.</p>
        
        <h2>3. Study with Friends</h2>
        <p>Group study sessions can make learning more enjoyable and keep you accountable.</p>
        
        <h2>4. Take Care of Your Health</h2>
        <p>Get enough sleep, eat well, and exercise. A healthy body supports a focused mind.</p>
        
        <h2>5. Visualize Success</h2>
        <p>Imagine yourself succeeding in your exams. Positive visualization boosts confidence.</p>
      `,
      author: "Michael Chen",
      authorImage: "https://i.pravatar.cc/150?img=2",
      authorBio: "Productivity expert and former university counselor. Helps students achieve their academic goals.",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "exam-prep",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 189,
      comments: 32,
      tags: ["Motivation", "Exam Prep", "Student Life"]
    },
    {
      id: 3,
      slug: "pomodoro-technique-guide",
      title: "The Pomodoro Technique: A Student's Guide",
      content: `
        <p>The Pomodoro Technique is a time management method that can revolutionize your study sessions.</p>
        
        <h2>What is the Pomodoro Technique?</h2>
        <p>Developed by Francesco Cirillo in the late 1980s, this technique uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
        
        <h2>How to Use It</h2>
        <p>1. Choose a task you want to work on<br/>
        2. Set a timer for 25 minutes<br/>
        3. Work on the task until the timer rings<br/>
        4. Take a short 5-minute break<br/>
        5. After four pomodoros, take a longer 15-30 minute break</p>
        
        <h2>Why It Works</h2>
        <p>The technique creates urgency, reduces burnout, and makes large tasks feel manageable. It's perfect for students who struggle with procrastination.</p>
      `,
      author: "Emily Rodriguez",
      authorImage: "https://i.pravatar.cc/150?img=3",
      authorBio: "Productivity coach and author of 'Study Smarter, Not Harder'. Helps students master time management.",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "productivity",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 28,
      tags: ["Productivity", "Time Management", "Study Tips"]
    },
    {
      id: 4,
      slug: "digital-vs-traditional-note-taking",
      title: "Digital vs Traditional Note-Taking: What's Better?",
      content: `
        <p>The debate between digital and traditional note-taking continues. Let's explore the pros and cons of each method.</p>
        
        <h2>Digital Note-Taking</h2>
        <p><strong>Pros:</strong> Searchable, portable, easy to organize, can include multimedia<br/>
        <strong>Cons:</strong> Distractions from devices, screen fatigue, less retention</p>
        
        <h2>Traditional Note-Taking</h2>
        <p><strong>Pros:</strong> Better memory retention, no distractions, personal connection<br/>
        <strong>Cons:</strong> Harder to search, can be lost, takes more time</p>
        
        <h2>Our Recommendation</h2>
        <p>Use both! Take initial notes by hand for better retention, then digitize them for organization and review.</p>
      `,
      author: "David Kim",
      authorImage: "https://i.pravatar.cc/150?img=4",
      authorBio: "Educational researcher specializing in learning methods and student success strategies.",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "study-tips",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 142,
      comments: 23,
      tags: ["Note-Taking", "Study Tips", "Technology"]
    },
    {
      id: 5,
      slug: "perfect-study-space",
      title: "Creating the Perfect Study Space",
      content: `
        <p>Your environment plays a huge role in how effectively you study. Here's how to create the perfect study space.</p>
        
        <h2>1. Choose the Right Location</h2>
        <p>Find a quiet place with minimal distractions. This could be a library, a coffee shop, or a dedicated room at home.</p>
        
        <h2>2. Lighting Matters</h2>
        <p>Natural light is best. If studying at night, use warm, soft lighting to reduce eye strain.</p>
        
        <h2>3. Ergonomics</h2>
        <p>Invest in a comfortable chair and desk. Your posture affects your focus and energy levels.</p>
        
        <h2>4. Keep It Organized</h2>
        <p>A cluttered space leads to a cluttered mind. Keep only what you need on your desk.</p>
        
        <h2>5. Personalize</h2>
        <p>Add plants, motivational quotes, or pictures that make you feel positive and focused.</p>
      `,
      author: "Lisa Wang",
      authorImage: "https://i.pravatar.cc/150?img=5",
      authorBio: "Interior designer specializing in study and work spaces. Helps students create productive environments.",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "productivity",
      image: "https://i.ibb.co.com/v6P2vh3m/istockphoto-944631208-612x612.jpg",   
      likes: 98,
      comments: 15,
      tags: ["Study Space", "Productivity", "Environment"]
    },
    {
      id: 6,
      slug: "managing-stress-finals",
      title: "Managing Stress During Finals Week",
      content: `
        <p>Finals week can be overwhelming. Here are mental health strategies to help you cope.</p>
        
        <h2>1. Plan Ahead</h2>
        <p>Create a study schedule and stick to it. Knowing what to study and when reduces anxiety.</p>
        
        <h2>2. Take Breaks</h2>
        <p>Study in intervals and take regular breaks. Your brain needs rest to function well.</p>
        
        <h2>3. Stay Active</h2>
        <p>Even a short walk can clear your mind and reduce stress levels.</p>
        
        <h2>4. Talk to Someone</h2>
        <p>Don't keep stress to yourself. Talk to friends, family, or counselors.</p>
        
        <h2>5. Sleep Matters</h2>
        <p>Pulling all-nighters is counterproductive. Get at least 7-8 hours of sleep.</p>
      `,
      author: "Dr. James Wilson",
      authorImage: "https://i.pravatar.cc/150?img=6",
      authorBio: "Clinical psychologist specializing in student mental health and stress management.",
      date: "March 3, 2024",
      readTime: "6 min read",
      category: "student-life",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 210,
      comments: 38,
      tags: ["Mental Health", "Stress Management", "Finals"]
    }
  ];

  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article>
          {/* Category */}
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border mb-6 ${getCategoryStyle(post.category)}`}>
            {post.category === 'study-tips' ? '📚 Study Tips' : 
             post.category === 'productivity' ? '⚡ Productivity' :
             post.category === 'exam-prep' ? '📝 Exam Prep' : '🎓 Student Life'}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <img 
              src={post.authorImage} 
              alt={post.author} 
              className="w-14 h-14 rounded-full ring-2 ring-indigo-500/50"
              onError={(e) => {
                e.target.src = 'https://i.pravatar.cc/150?img=1';
              }}
            />
            <div>
              <p className="text-white font-semibold">{post.author}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FaClock className="text-indigo-400" /> {post.readTime}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          
          <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 [&>h2]:text-white [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors cursor-default">
                #{tag}
              </span>
            ))}
          </div>

          {/* Engagement Bar */}
          <div className="flex items-center justify-between py-6 border-t border-white/10">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors group">
                <FaHeart className="group-hover:scale-110 transition-transform" /> 
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors group">
                <FaComment className="group-hover:scale-110 transition-transform" /> 
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group">
                <FaBookmark className="group-hover:scale-110 transition-transform" /> 
                <span>Save</span>
              </button>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors group">
              <FaShare className="group-hover:scale-110 transition-transform" /> 
              <span>Share</span>
            </button>
          </div>

          {/* Author Bio */}
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 mt-8 border border-white/10">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
              About the Author
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{post.authorBio}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;