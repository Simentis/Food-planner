using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanMealAPI.Models
{
    public class CalendarEvent
    {

        [Key]
        public int Id { get; set; }
 
        public DateTime? Start { get; set; }
   
        public DateTime? End { get; set; }

        public string Title { get; set; }
        public string Color { get; set; }
        public string Actions { get; set; }
        public bool AllDay { get; set; }
        public string UserName { get; set; }

    }
}
