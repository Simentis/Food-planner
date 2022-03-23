using System;
using System.ComponentModel.DataAnnotations;

namespace PlanMealAPI.Models
{
    public class ComponentDetailMealDetail
    {


        public int ComponentId { get; set; }
        public ComponentDetail ComponentDetail { get; set; }

        public int MealId { get; set; }
        public MealDetail MealDetail { get; set; }
    }
}
