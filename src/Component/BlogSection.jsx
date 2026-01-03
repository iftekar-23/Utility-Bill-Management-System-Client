import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaClock } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const BlogSection = () => {
  const { isDark } = useTheme();

  const blogPosts = [
    {
      id: 1,
      title: "5 Tips to Reduce Your Monthly Utility Bills",
      excerpt: "Discover practical strategies to lower your electricity, water, and gas bills without compromising comfort.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Money Saving"
    },
    {
      id: 2,
      title: "Understanding Your Electricity Bill: A Complete Guide",
      excerpt: "Learn how to read and understand every component of your electricity bill to make informed decisions.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
      author: "Michael Chen",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Education"
    },
    {
      id: 3,
      title: "The Future of Digital Bill Management",
      excerpt: "Explore how technology is revolutionizing the way we manage and pay our utility bills.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      author: "Emily Rodriguez",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Technology"
    }
  ];

  return (
    <section className="section-padding" id="blog">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Latest Insights</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Stay informed with our latest articles, tips, and insights about bill management, energy saving, and financial wellness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`card overflow-hidden group cursor-pointer ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FaUser />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendar />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium group-hover:text-blue-600 transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Read More
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-blue-600"
                    >
                      <FaArrowRight />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;