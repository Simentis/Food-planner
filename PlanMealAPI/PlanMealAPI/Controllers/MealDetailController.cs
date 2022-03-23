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
    public class MealDetailController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly AuthenticationContext _context;
        public MealDetailController(UserManager<ApplicationUser> userManager, AuthenticationContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/MealDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealDetail>>> GetMealDetails()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return await _context.MealDetails.Where(x => x.UserName.Equals(user.UserName.ToString())).ToListAsync();
        }

        // GET: api/MealDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealDetail>> GetMealDetail(int id)
        {
         
            var mealDetail = await _context.MealDetails.FindAsync(id);

            if (mealDetail == null)
            {
                return NotFound();
            }

            return mealDetail;
        }

        // PUT: api/MealDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMealDetail(int id, MealDetail mealDetail)
        {
            if (id != mealDetail.MealId)
            {
                return BadRequest();
            }

            _context.Entry(mealDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealDetailExists(id))
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

        // POST: api/MealDetail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MealDetail>> PostMealDetail(MealDetail mealDetail)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            mealDetail.UserName = user.UserName.ToString();
            _context.MealDetails.Add(mealDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMealDetail", new { id = mealDetail.MealId }, mealDetail);
        }

        // DELETE: api/MealDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMealDetail(int id)
        {
            var mealDetail = await _context.MealDetails.FindAsync(id);
            if (mealDetail == null)
            {
                return NotFound();
            }

            _context.MealDetails.Remove(mealDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealDetailExists(int id)
        {
            return _context.MealDetails.Any(e => e.MealId == id);
        }
    }
}
