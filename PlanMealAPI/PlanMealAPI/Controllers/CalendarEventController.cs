using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanMealAPI.Models;

namespace PlanMealAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class CalendarEventController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
       
        private readonly AuthenticationContext _context;

        public CalendarEventController(UserManager<ApplicationUser> userManager,AuthenticationContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/CalendarEvent 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CalendarEvent>>> GetCalendarEvents()
        { 
            string userId = User.Claims.First(c => c.Type == "UserID").Value; 
            var user = await _userManager.FindByIdAsync(userId);
            return await _context.CalendarEvents.Where(x => x.UserName.Equals(user.UserName.ToString())).ToListAsync();
        }

        // GET: api/CalendarEvent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CalendarEvent>> GetCalendarEvent(int id)
        {
           
            var calendarEvent = await _context.CalendarEvents.FindAsync(id);

            if (calendarEvent == null)
            {
                return NotFound();
            }

            return calendarEvent;
        }
        
        // PUT: api/CalendarEvent/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCalendarEvent(int id, CalendarEvent calendarEvent)
        {
            if (id != calendarEvent.Id)
            {
                return BadRequest();
            }
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            calendarEvent.UserName = user.UserName.ToString();
            _context.Entry(calendarEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalendarEventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        

       // POST: api/CalendarEvent
       // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       [HttpPost]
        public async Task<ActionResult<CalendarEvent>> PostCalendarEvent(CalendarEvent calendarEvent)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            calendarEvent.UserName = user.UserName.ToString();
            _context.CalendarEvents.Add(calendarEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCalendarEvent", new { id = calendarEvent.Id}, (calendarEvent)
            );
        }

        // DELETE: api/CalendarEvent/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalendarEvent(int id)
        {
            var calendarEvent = await _context.CalendarEvents.FindAsync(id);
            if (calendarEvent == null)
            {
                return NotFound();
            }

            _context.CalendarEvents.Remove(calendarEvent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CalendarEventExists(int id)
        {
            return _context.CalendarEvents.Any(e => e.Id == id);
        }
    }
}
