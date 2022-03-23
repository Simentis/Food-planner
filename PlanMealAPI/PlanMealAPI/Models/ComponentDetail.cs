using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanMealAPI.Models
{
    public class ComponentDetail
    {
        [Key]
        public int ComponentId { get; set; }

        [Column (TypeName = "nvarchar(100)")]
        public string ComponentName { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string ComponentType { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string UserName { get; set; }

        public List<ComponentDetailMealDetail> ComponentDetailMealDetails { get; set; }
    }
}
