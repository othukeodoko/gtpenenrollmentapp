using Microsoft.EntityFrameworkCore;

namespace gtpenenrollmentapp.Server.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<EnrollmentForm> EnrollmentForms { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add any additional configurations here
        }
    }
}
