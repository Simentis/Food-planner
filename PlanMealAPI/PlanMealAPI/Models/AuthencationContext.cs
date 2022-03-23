using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using PlanMealAPI.Models;

namespace PlanMealAPI.Models
{
    public class AuthenticationContext : IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ComponentDetail> ComponentDetails { get; set; }
        public DbSet<MealDetail> MealDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ComponentDetailMealDetail>()
                .HasKey(t => new { t.ComponentId, t.MealId })
                ;

            modelBuilder.Entity<ComponentDetailMealDetail>()
                .HasOne(pt => pt.ComponentDetail)
                .WithMany(p => p.ComponentDetailMealDetails)
                .HasForeignKey(pt => pt.ComponentId);

            modelBuilder.Entity<ComponentDetailMealDetail>()
                .HasOne(pt => pt.MealDetail)
                .WithMany(t => t.ComponentDetailMealDetails)
                .HasForeignKey(pt => pt.MealId);
        }
        public DbSet<PlanMealAPI.Models.ComponentDetailMealDetail> ComponentDetailMealDetail { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
      
    }
}
