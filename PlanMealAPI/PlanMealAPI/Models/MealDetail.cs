using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanMealAPI.Models
{
    public class MealDetail
    {

        [Key]
        public int MealId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string MealName { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string MealCategory { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string MealRecipe { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string UserName { get; set; }
        public List<ComponentDetailMealDetail> ComponentDetailMealDetails { get; set; }

    }
}
